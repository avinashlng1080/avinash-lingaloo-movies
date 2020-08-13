import type Movie from '@app/types/Movie';

// At some point the list of movies will be fetched from some
// API. For now we just hardcode some movie objects and leave
// it up to a util function to generate a random number of
// movies from these values. It is OK to repeat movies.
const Movies: Array<Movie> = [
    {
        name: 'Aladdin',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Aladdin.jpg',
        gender: 'Family',
        description:
            'A kind-hearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.',
    },
    {
        name: 'Aquaman',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Aquaman.jpg',
        gender: 'Adventure',
        description:
            'Arthur Curry (Jason Momoa), the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land.',
    },
    {
        name: 'Avatar',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Avatar.jpg',
        gender: 'Adventure',
        description:
            'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    },
    {
        name: 'Beauty and the beast',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Beauty-Beast.jpg',
        gender: 'Fantasy',
        description:
            'A selfish Prince is cursed to become a monster for the rest of his life, unless he learns to fall in love with a beautiful young woman he keeps prisoner.',
    },
    {
        name: 'Black Widow',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Black-Widow.jpg',
        gender: 'Action',
        description:
            'A film about Natasha Romanoff in her quests between the films Civil War and Infinity War.',
    },
    {
        name: 'Blade Runner',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Blade-Runner.jpg',
        gender: 'Sci-Fi',
        description:
            'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
    },
    {
        name: 'Bloodshot',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Bloodshot.jpg',
        gender: 'Action',
        description:
            'Ray Garrison, a slain soldier, is re-animated with superpowers.',
    },
    {
        name: 'Doctor Strange',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Doctor-Strange.jpg',
        gender: 'Action',
        description:
            'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.',
    },
    {
        name: 'Extraction',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Extraction.jpg',
        gender: 'Action',
        description:
            "Tyler Rake, a fearless black market mercenary, embarks on the most deadly extraction of his career when he's enlisted to rescue the kidnapped son of an imprisoned international crime lord.",
    },
    {
        name: 'The Hangover',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Hangover.jpg',
        gender: 'Comedy',
        description:
            'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
    },
    {
        name: 'Inception',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Inception.jpg',
        gender: 'Action',
        description:
            'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    },
    {
        name: 'Kin',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Kin.jpg',
        gender: 'Action',
        description:
            'Chased by a vengeful criminal, the feds and a gang of otherworldly soldiers, a recently released ex-con, and his adopted teenage brother are forced to go on the run with a weapon of mysterious origin as their only protection.',
    },
    {
        name: 'The Lion King',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Lion-King.jpg',
        gender: 'Animation',
        description:
            'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    },
    {
        name: 'The Matrix',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Matrix.jpg',
        gender: 'Sci-fi',
        description:
            'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    },
    {
        name: 'Pirates of the Caribbean: On Stranger Tides',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Pirates-Caribbean.jpg',
        gender: 'Adventure',
        description:
            'Jack Sparrow and Barbossa embark on a quest to find the elusive fountain of youth, only to discover that Blackbeard and his daughter are after it too.',
    },
    {
        name: 'Rambo: First Blood',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Rambo.jpg',
        gender: 'Action',
        description:
            'A veteran Green Beret is forced by a cruel Sheriff and his deputies to flee into the mountains and wage an escalating one-man war against his pursuers.',
    },
    {
        name: 'Spies in Disguise',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Spies.jpg',
        gender: 'Animation',
        description:
            "When the world's best spy is turned into a pigeon, he must rely on his nerdy tech officer to save the world.",
    },
    {
        name: 'Togo',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Togo.jpg',
        gender: 'Biography',
        description:
            'The story of Togo, the sled dog who led the 1925 serum run yet was considered by most to be too small and weak to lead such an intense race.',
    },
    {
        name: 'Tron: Legacy',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Tron.jpg',
        gender: 'Sci-Fi',
        description:
            "The son of a virtual world designer goes looking for his father and ends up inside the digital world that his father designed. He meets his father's corrupted creation and a unique ally who was born inside the digital world.",
    },
    {
        name: 'Up',
        poster:
            'https://raw.githubusercontent.com/enahum/mattermost-react-native-interview/master/posters/Up.jpg',
        gender: 'Animation',
        description:
            '78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.',
    },
];

export default Movies;
