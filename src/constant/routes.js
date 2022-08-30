import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const ROUTES = [
    {
        path: '/subjects',
        name: 'Subjects',
        access_level: 100,
        icon: <MenuBookIcon />
    },
    {
        path: '/users',
        name: 'Users',
        access_level: 100,
        icon: <PeopleAltIcon />
    },
]    

export default ROUTES