import { render, renderHook, screen, waitFor } from "@testing-library/react";

import { Client } from "@/types";

import { mockPokemonData } from "../mocks";

describe("SRApp", () => {
    let useSRAppProps: typeof import("@/components/SRApp").useSRAppProps;
    let SRAppView: typeof import("@/components/SRApp").SRAppView;

    const MockClient: Client = {
        getPokemon: jest.fn(),
    };

    beforeAll(async () => {
        jest.mock("../../src/api", () => MockClient);
        (MockClient.getPokemon as jest.Mock).mockResolvedValue(mockPokemonData);

        const SRAppModule = await import("@/components/SRApp");
        useSRAppProps = SRAppModule.useSRAppProps;
        SRAppView = SRAppModule.SRAppView;
    });

    it("should fetch data", async () => {
        const { result } = renderHook(() => useSRAppProps());
        await waitFor(() => expect(result.current).toEqual({ data: mockPokemonData }));
    });

    it("should render", async () => {
        render(<SRAppView data={mockPokemonData} />);
        expect(await screen.findByRole("heading")).toHaveTextContent("charmander");
    });
});