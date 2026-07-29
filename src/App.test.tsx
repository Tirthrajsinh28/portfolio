import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";
import { App } from "./App";

function renderRoute(route: string) {
  window.history.replaceState({}, "", route);
  return render(<App />);
}

describe("portfolio foundation", () => {
  it("renders the evidence-led home page", () => {
    renderRoute("/");

    expect(
      screen.getByRole("heading", { name: /reliable backends/i, level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /primary navigation/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/build it\. test it\. explain it\./i)).toBeInTheDocument();
  });

  it("renders the locally verified ServicePulse evidence and limitations", async () => {
    const { container } = renderRoute("/projects/servicepulse");

    expect(
      screen.getByRole("heading", { name: "ServicePulse", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Locally verified")).not.toHaveLength(0);
    expect(screen.getByText("Not published")).toBeInTheDocument();
    expect(screen.getByText("Verified locally; no live URL")).toBeInTheDocument();
    expect(
      screen.getByText(/68 backend tests pass with an enforced 80% line gate/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/failed-notification administrator\/viewer states/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Docker is unavailable locally/i),
    ).toBeInTheDocument();
    expect(screen.queryByText("Pending implementation")).not.toBeInTheDocument();
    expect(screen.queryByText(/successfully deployed/i)).not.toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders the locally verified CloudFileFlow evidence and limits", async () => {
    const { container } = renderRoute("/projects/cloudfileflow");

    expect(
      screen.getByRole("heading", { name: "CloudFileFlow", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Locally verified")).not.toHaveLength(0);
    expect(
      screen.getByText(/31 tests pass in a fresh hash-locked environment/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Docker is unavailable locally/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/checks are explicitly not malware scanning/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/successfully deployed/i)).not.toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders the locally verified ReleaseGuard evidence and limits", async () => {
    const { container } = renderRoute("/projects/releaseguard");

    expect(
      screen.getByRole("heading", { name: "ReleaseGuard", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Locally verified")).not.toHaveLength(0);
    expect(
      screen.getByText(/13 tests pass with coverage enabled/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/exit 0 for the ready example/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/is not a vulnerability scanner/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/guarantees security/i)).not.toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders the custom 404 route", () => {
    renderRoute("/this-route-does-not-exist");

    expect(
      screen.getByRole("heading", {
        name: /that route is not in the architecture/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it.each([
    ["/about", "Engineering that can be inspected"],
    ["/projects", "A focused backend and cloud portfolio"],
    ["/experience", "Claims are reviewed before they become profile copy"],
    ["/education", "Computer Programming, Sault College"],
    ["/skills", "Skills connected to project evidence"],
    ["/resume", "Evidence-based revision in progress"],
    ["/contact", "Let's connect"],
    ["/privacy", "A minimal-data portfolio"],
  ])("renders the required %s route", (route, heading) => {
    renderRoute(route);

    expect(
      screen.getByRole("heading", { name: heading, level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders the approved public email contact", () => {
    renderRoute("/contact");

    expect(
      screen.getByRole("link", { name: /email tirthrajsinh2803@gmail.com/i }),
    ).toHaveAttribute("href", "mailto:tirthrajsinh2803@gmail.com");
  });

  it("resets scroll and focuses main content after client-side navigation", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: scrollTo,
      writable: true,
    });
    renderRoute("/");
    const primaryNavigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });

    await user.click(
      within(primaryNavigation).getByRole("link", { name: "Projects" }),
    );

    expect(
      screen.getByRole("heading", {
        name: "A focused backend and cloud portfolio",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });
    expect(document.activeElement).toHaveAttribute("id", "main-content");
  });

  it("has no automated accessibility violations on the home page", async () => {
    const { container } = renderRoute("/");
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
