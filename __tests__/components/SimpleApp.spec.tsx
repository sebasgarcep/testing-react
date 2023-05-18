import { render, screen } from "@testing-library/react";

import { Client } from "@/types";

describe("SimpleApp", () => {
    let SimpleApp: typeof import("@/components/SimpleApp").default;

    const MockClient: Client = {
        getPokemon: jest.fn(),
    };

    beforeAll(async () => {
        jest.mock("../../src/api", () => MockClient);
        (MockClient.getPokemon as jest.Mock).mockResolvedValue({
            name: "charmander",
            picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
        });

        SimpleApp = (await import("@/components/SimpleApp")).default;
    });

    it("should render", async () => {
        render(<SimpleApp />);
        expect(await screen.findByRole("heading")).toHaveTextContent("charmander");
    });
});