import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggle from "./Toggle";

function renderToggle() {
  const user = userEvent.setup();
  const { unmount } = render(<Toggle />);
  const el = screen.getByRole("switch", { name: /toggle active state/i });
  return { user, el, unmount };
}

describe("Toggle", () => {
  describe("interaction", () => {
    it("starts inactive", () => {
      const { el } = renderToggle();
      expect(el).not.toBeChecked();
    });

    it("click toggles to active", async () => {
      const { user, el } = renderToggle();
      await user.click(el);

      expect(el).toBeChecked();
      expect(el).toHaveClass("container--active");
    });
  });

  describe("timing", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("auto-reverts at exactly 2000ms", () => {
      const { el } = renderToggle();
      fireEvent.click(el);

      act(() => {
        vi.advanceTimersByTime(1999);
      });

      expect(el).toBeChecked();

      act(() => {
        vi.advanceTimersByTime(1);
      });

      expect(el).not.toBeChecked();
    });

    it("clicking off before 2000ms cancels the pending revert", () => {
      const { el } = renderToggle();
      fireEvent.click(el);
      fireEvent.click(el);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(el).not.toBeChecked();
    });
  });
});
