import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mocker localStorage
vi.stubGlobal("localStorage", {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
});
