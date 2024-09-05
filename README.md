# Pokémon Application

This is a simple and responsive Pokémon application that allows users to browse, search, and view detailed information about various Pokémon. The app leverages the PokéAPI to dynamically fetch Pokémon data and provides a clean and responsive user interface to display this information.

## Key Features

- **Pokémon List**: Displays a list of Pokémon with pagination and lazy loading. The list is dynamically fetched from the PokéAPI and can grow as users scroll down the page.
  
- **Pokémon Details**: Clicking on a Pokémon shows detailed information such as its ID, types, abilities, stats, and images. Each Pokémon has a dedicated details page that fetches this additional information.

- **Search Functionality**: A search bar allows users to filter Pokémon by name, providing real-time suggestions as they type.

- **Responsive Design**: The app is fully responsive, ensuring a great user experience on both desktop and mobile devices. The layout and elements adapt based on screen size, hiding unnecessary elements on smaller screens.

## Technologies Used

- **React**: The core framework used to build the user interface.
- **Next.js**: The app is powered by Next.js for server-side rendering and optimized performance.
- **PokéAPI**: The app fetches Pokémon data from the public PokéAPI.
- **Bootstrap**: Used for responsive layouts and styling.
- **Custom CSS**: Additional styling and layout enhancements tailored to the Pokémon data presentation.

## Project Structure

- **Pages**:
  - **Home Page**: Displays the main Pokémon list with lazy loading and search functionality.
  - **Details Page**: Displays detailed information about a selected Pokémon.

- **Components**:
  - **`PokeList`**: Renders the list of Pokémon in a responsive table. Includes lazy loading to fetch more Pokémon as the user scrolls.
  - **`PokeDetails`**: Displays detailed information about a selected Pokémon, such as its types, abilities, stats, and images.
  - **`SearchBar`**: Allows users to filter Pokémon by name, with suggestions appearing as they type.

- **Data Fetching**:
  - The application fetches Pokémon data using two API calls:
    - **`fetchPokemonList`**: Fetches a paginated list of Pokémon.
    - **`fetchPokemonDetails`**: Fetches detailed information about a specific Pokémon.

## How It Works

- **Lazy Loading**: The Pokémon list is loaded in batches as the user scrolls down, reducing the initial load time and improving performance for large datasets.
  
- **Search Functionality**: Users can search for specific Pokémon by name, and the results will dynamically filter the displayed Pokémon based on the search input.

- **Responsive Design**: The app's layout adapts to different screen sizes. On mobile, certain elements (like the "View Details" button) are hidden to streamline the user interface, and rows become clickable for easy navigation.

## Setup and Installation

   ```bash
   git clone https://github.com/luiscasanovas/pokemon-search-app.git
   cd pokemon-search-app
   npm install
   npm run dev
```
**Open the app in your browser**:
Navigate to http://localhost:3000 to view the application.

              


     

   

