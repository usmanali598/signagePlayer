/// <reference types="cypress" />
describe('Create and run the Playlist', () => {
    it('runs the whole process', () => {
        cy.visit('/');

        cy.contains('Add URLs').should('have.attr', 'disabled')
        cy.contains('Create Playlist').should('have.attr', 'disabled')

        // creating playlists
        cy.get("#formPlistName").type("Stuff")
        cy.get("#formContent").type("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4") 
        cy.contains('Add URLs').click()
        cy.get("#formContent").should('have.value', '')
        cy.get(".list-group-item").contains("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscape...")
        cy.contains('Add URLs').should('have.attr', 'disabled');       


        cy.get("#formContent").type("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4")
        cy.contains('Add URLs').click()
        cy.get("#formContent").should('have.value', '')
        cy.get(".list-group-item").contains("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes...")     
        cy.contains('Add URLs').should('have.attr', 'disabled');


        cy.get("#formContent").type("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4")
        cy.contains('Add URLs').click()
        cy.get("#formContent").should('have.value', '')
        cy.get(".list-group-item").contains("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrid...")     
        cy.contains('Add URLs').should('have.attr', 'disabled');

        // Running the playlist
        cy.contains('Create Playlist').click()
        cy.visit('/playlists');

        cy.get('a').contains('Playlists').should('have.attr', 'href', '/playlists')

        cy.get('[data-cy="playlistCard"]').eq(-1).find('.list-group-item').should('have.length', 3)
        cy.contains('Button', 'Play').click()
        
    })
})