import { Home, MoonIcon, SunIcon, Users2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { Button } from "../ui/button";
import { TabsContext } from "../../contexts/tabsContext";
import AlertDropdown from "../../alerts/alertDropDown";
import { alertContext } from "../../contexts/alertContext";
import { darkContext } from "../../contexts/darkContext";
import { PopUpContext } from "../../contexts/popUpContext";
import { typesContext } from "../../contexts/typesContext";
import MenuBar from "./components/menuBar";
import { Link, useLocation, useParams } from "react-router-dom";
import { USER_PROJECTS_HEADER } from "../../constants";
import { getRepoStars } from "../../controllers/API";
import { Separator } from "../ui/separator";
import { Bell } from "lucide-react";
import bitbazalogo from "../../assets/bitbazalogo.png";
import { colors } from "@mui/material";

export default function Header() {
  const { flows, addFlow, tabId } = useContext(TabsContext);
  const { openPopUp } = useContext(PopUpContext);
  const { templates } = useContext(typesContext);
  const { id } = useParams();
  const AlertWidth = 384;
  const { dark, setDark } = useContext(darkContext);
  const { notificationCenter, setNotificationCenter, setErrorData } =
    useContext(alertContext);
  const location = useLocation();

  const [stars, setStars] = useState(null);

  useEffect(() => {
    async function fetchStars() {
      const starsCount = await getRepoStars("logspace-ai", "langflow");
      setStars(starsCount);
    }
    fetchStars();
  }, []);
  return (
    <div className="header-arrangement">
      <div className="header-start-display">
        <Link to="/">
          <img className="ml-10 w-[50px]" src={bitbazalogo} alt="bitbaza.io-logo"/>
        </Link>
        {flows.findIndex((f) => tabId === f.id) !== -1 && tabId !== "" && (
          <MenuBar flows={flows} tabId={tabId} />
        )}
      </div>
      <div className="round-button-div">
        <Link to="/">
          <Button
            className="gap-2"
            variant={location.pathname === "/" ? "primary" : "secondary"}
            size="sm"
          >
            <Home className="h-4 w-4" />
            <div className="flex-1">{USER_PROJECTS_HEADER}</div>
          </Button>
        </Link>
        <Link to="/community">
          <Button
            className="gap-2"
            variant={
              location.pathname === "/community" ? "primary" : "secondary"
            }
            size="sm"
          >
            <Users2 className="h-4 w-4" />
            <div className="flex-1">Community Examples</div>
          </Button>
        </Link>
      </div>
      <div className="header-end-division">
        <div className="header-end-display">
          
          <a
            href="https://twitter.com/BitbazaIO?t=CxvQ8zVoL84yOJXuAaLjSQ&s=09 "
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground"
          >
            <FaTwitter className="side-bar-button-size" style={{color: "#8793ff"}} />
          </a>
          <a
            href="https://discord.gg/ECA9S6RR "
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground"
          >
            <FaDiscord className="side-bar-button-size" style={{color: "#8793ff"}}  />
          </a>

          <Separator orientation="vertical" />
          <button
            className="extra-side-bar-save-disable"
            onClick={() => {
              setDark(!dark);
            }}
          >
            {dark ? (
              <SunIcon className="side-bar-button-size" style={{color:"ffdd87"}} />
            ) : (
              <MoonIcon className="side-bar-button-size" />
            )}
          </button>
          <button
            className="extra-side-bar-save-disable relative"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setNotificationCenter(false);
              const { top, left } = (
                event.target as Element
              ).getBoundingClientRect();
              openPopUp(
                <>
                  <div
                    className="absolute z-10"
                    style={{ top: top + 34, left: left - AlertWidth}}
                  >
                    <AlertDropdown />
                  </div>
                  <div className="header-notifications-box"></div>
                </>
              );
            }}
          >
            {notificationCenter && (
              <div className="header-notifications"></div>
            )}
            <Bell className="side-bar-button-size" aria-hidden="true"  fill="#ffdd87" />
          </button>
        </div>
      </div>
    </div>
  );
}
