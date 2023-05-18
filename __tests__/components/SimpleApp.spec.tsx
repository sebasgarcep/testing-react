import { render, screen } from "@testing-library/react";

import { Client } from "@/types";

import { mockPokemonData } from "../mocks";

describe("SimpleApp", () => {
    let SimpleApp: typeof import("@/components/SimpleApp").default;

    const MockClient: Client = {
        getPokemon: jest.fn(),
    };

    beforeAll(async () => {
        jest.mock("../../src/api", () => MockClient);
        (MockClient.getPokemon as jest.Mock).mockResolvedValue(mockPokemonData);

        SimpleApp = (await import("@/components/SimpleApp")).default;
    });

    it("should render", async () => {
        render(<SimpleApp />);
        expect(await screen.findByRole("heading")).toHaveTextContent("charmander");
    });
});