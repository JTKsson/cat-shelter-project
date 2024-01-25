import HamburgerMenu from "../HamburgerMenu"
import Navbar from "../Navbar"

const Header = () => {

  return(
    <div className="flex flex-col h-40 bg-gray-800 p-4 relative">
    <Navbar/>
    <HamburgerMenu/>
    <h1 className="self-center mt-auto md:text-5xl text-2xl md:sticky">Random Cat Shelter</h1>
    </div>
  )
}

export default Header