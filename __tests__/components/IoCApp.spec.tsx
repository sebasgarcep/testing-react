import { render, renderHook, screen, waitFor } from "@testing-library/react";

import type { Client } from "@/types";
import { ApiContext, useIoCAppProps, IoCAppView } from "@/components/IoCApp";

import { mockPokemonData } from "../mocks";

describe("IoCApp", () => {
    const mockClient: Client = {
        getPokemon: jest.fn(),
    };

    beforeAll(async () => {
        (mockClient.getPokemon as jest.Mock).mockResolvedValue(mockPokemonData);
    });

    it("should fetch data", async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ApiContext.Provider value={mockClient}>{children}</ApiContext.Provider>
        );
        const { result } = renderHook(() => useIoCAppProps(), { wrapper });
        await waitFor(() => expect(result.current).toEqual({ data: mockPokemonData }));
    });

    it("should render", async () => {
        render(<IoCAppView data={mockPokemonData} />);
        expect(await screen.findByRole("heading")).toHaveTextContent("charmander");
    });
});