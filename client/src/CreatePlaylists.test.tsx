import { describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CreatePlaylists from './components/CreatePlaylists';
import { BrowserRouter } from "react-router-dom";

describe('<CreatePlaylists />', () => {
    it("renders", async () => {
        render(
            <BrowserRouter>
                <CreatePlaylists />
            </BrowserRouter>
        );

        const inputName = screen.getByRole('textbox', {
            name: /name/i
        })
        expect(inputName).toBeTruthy();

        const inputContent = screen.getByRole('textbox', {
            name: /add content/i
        })
        expect(inputContent).toBeDefined();

        const addUrls = screen.getByRole('button', {
            name: /add urls/i
        })

        expect(addUrls).toBeTruthy();


        const createPlistButton = screen.getByRole('button', {
            name: /Create Playlist/i
        })

        expect(createPlistButton).toBeDefined();
    })
});

