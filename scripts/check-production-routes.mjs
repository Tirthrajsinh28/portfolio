import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const portfolioRoot = path.resolve(scriptDirectory, "..");
const tscScript = path.join(portfolioRoot, "node_modules", "typescript", "bin", "tsc");
const viteScript = path.join(portfolioRoot, "node_modules", "vite", "bin", "vite.js");
const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;

const routes = [
  "/",
  "/about",
  "/projects",
  "/projects/servicepulse",
  "/projects/cloudfileflow",
  "/projects/releaseguard",
  "/experience",
  "/education",
  "/skills",
  "/resume",
  "/contact",
  "/privacy",
  "/definitely-missing-route",
];

const pngAssets = [
  "/screenshots/servicepulse-dashboard-desktop.png",
  "/screenshots/servicepulse-incident-detail-desktop.png",
  "/screenshots/servicepulse-services-mobile.png",
  "/screenshots/cloudfileflow-local-flow.png",
  "/screenshots/releaseguard-cli-report.png",
];

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: portfolioRoot,
      stdio: "inherit",
      ...options,
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `${command} ${args.join(" ")} exited with ${code ?? signal ?? "unknown status"}`,
        ),
      );
    });
  });
}

function isPortOpen() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: "127.0.0.1", port });
    socket.setTimeout(250);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => {
      resolve(false);
    });
  });
}

async function waitForPreviewReady(previewProcess) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (previewProcess.exitCode !== null) {
      throw new Error(`Vite preview exited before readiness with code ${previewProcess.exitCode}.`);
    }

    if (await isPortOpen()) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Vite preview did not become ready on ${baseUrl}.`);
}

async function fetchText(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  if (response.status !== 200) {
    throw new Error(`Expected HTTP 200 for ${pathname}, received ${response.status}.`);
  }

  const body = await response.text();
  if (!body.includes('<div id="root">')) {
    throw new Error(`Route ${pathname} did not return the Vite app root.`);
  }
}

async function fetchPng(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  if (response.status !== 200) {
    throw new Error(`Expected HTTP 200 for ${pathname}, received ${response.status}.`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/png")) {
    throw new Error(`Expected PNG content type for ${pathname}, received ${contentType}.`);
  }

  const bytes = await response.arrayBuffer();
  if (bytes.byteLength < 1000) {
    throw new Error(`Asset ${pathname} was unexpectedly small: ${bytes.byteLength} bytes.`);
  }
}

async function stopPreview(previewProcess) {
  if (previewProcess.exitCode !== null) {
    return;
  }

  previewProcess.kill("SIGTERM");
  await new Promise((resolve) => {
    const timeout = setTimeout(() => {
      if (previewProcess.exitCode === null) {
        previewProcess.kill("SIGKILL");
      }
      resolve();
    }, 5000);
    previewProcess.once("exit", () => {
      clearTimeout(timeout);
      resolve();
    });
  });
}

if (await isPortOpen()) {
  throw new Error(`Port ${port} is already in use; refusing to attach to an unknown process.`);
}

let previewProcess;

try {
  await runCommand(process.execPath, [tscScript, "-b"]);
  await runCommand(process.execPath, [viteScript, "build"]);

  previewProcess = spawn(
    process.execPath,
    [viteScript, "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
    {
      cwd: portfolioRoot,
      stdio: "inherit",
    },
  );

  await waitForPreviewReady(previewProcess);

  for (const route of routes) {
    await fetchText(route);
  }

  for (const asset of pngAssets) {
    await fetchPng(asset);
  }

  console.log("Portfolio production route preflight passed.");
  console.log(`Verified routes: ${routes.length}`);
  console.log(`Verified PNG assets: ${pngAssets.length}`);
} finally {
  if (previewProcess) {
    await stopPreview(previewProcess);
  }
}
