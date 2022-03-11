import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import { useNavigate } from 'react-router-dom';
import IncidentTable from '../components/tables/IncidentsTable.js';

import MenuPrincipal from '../components/menu/MenuPrincipal';

 
function Home(props) {
    
    const user = getUser();
    let navigate = useNavigate();


    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();    
        navigate('/login');
    }
 
    return (
    <div>
        <MenuPrincipal />
        Welcome {user}!<br /><br />

        <div>
            <IncidentTable />
        </div>
        <p></p>
        <input type="button" onClick={handleLogout} value="Logout" />
    </div>
    );
}
 
export default Home;