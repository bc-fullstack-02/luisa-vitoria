import Profile from "../../Components/Profile";
import NavBar from "../../Components/NavBar";

function ProfilePage() {
    return (
        <div className="w-screen h-screen md:flex md:flex-row">
            <NavBar  />
            <Profile />
        </div>
       
    )
}

export default ProfilePage;