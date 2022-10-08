import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { GiShuttlecock } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { MdApproval, MdOutlineManageAccounts } from "react-icons/md";
import { ImSortAlphaAsc, ImSortAlphaDesc, ImSortNumericAsc, ImSortNumbericDesc} from "react-icons/im"
import { AiOutlineUserAdd, AiFillSwitcher } from "react-icons/ai";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsTranslate } from "react-icons/bs";
import { BiUserVoice } from "react-icons/bi";
import { RESOURCES } from "../../resource";

function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [alphaAsc, setAlphaAsc] = useState(true);
  const [numericAsc, setNumericAsc] = useState(true);

  const setShowAddPlayersModal = () => {
    props.setShowAddPlayersModal(true);
  }

  const showAwaitingApprovalModal = () => {
    props.setShowAwaitingApprovalModal(true);
  }

  const showManagePlayersModal = () => {
    props.setShowManagePlayersModal(true);
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  const sortAlpha = () => {
    setAlphaAsc(!alphaAsc);
    props.sortAvailablePlayersByName(alphaAsc);
  }

  const sortNumeric = () => {
    setNumericAsc(!numericAsc);
    props.sortAvailablePlayersByPlayCount(numericAsc);
  }


  const showEndSessionModal = () => {
		props.setShowEndSessionModal(true);
	}

  const unapprovedPlayersCount = props.playerList.filter(player => {
    if (!player.approved) {
      return true;
    }
    return false;
  }).length;

  return (
    <div className="flex-grow mr-3" style={{height: "100vh"}}>
      <ProSidebar
        className="h-100"
        collapsed={collapsed}
      >
        <SidebarContent>
          <Menu iconShape="round">
            <MenuItem icon={<GiShuttlecock/>} >
              <NavLink className="nav-link p-0" to="/">
              {RESOURCES[props.language].SESSION.SIDEBAR.HOME}
              </NavLink>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              style={unapprovedPlayersCount > 0 ? {color: "#ffc107"} : null}
              icon={
                unapprovedPlayersCount > 0 ?
                <div className="spinner-grow text-warning" role="status"/> :
                <MdApproval/>
              }
              suffix={<span className="badge badge-warning badge-pill">{unapprovedPlayersCount}</span>}
              onClick={showAwaitingApprovalModal}
            >
              {RESOURCES[props.language].SESSION.SIDEBAR.AWAITING_APPROVAL}
            </MenuItem>
            <MenuItem icon={<AiOutlineUserAdd/>}
              onClick={setShowAddPlayersModal}
            >
              {RESOURCES[props.language].SESSION.SIDEBAR.ADD_PLAYERS}
            </MenuItem>
            <MenuItem
              icon={<MdOutlineManageAccounts/>}
              onClick={showManagePlayersModal}
            >
              {RESOURCES[props.language].SESSION.SIDEBAR.MANAGE_PLAYERS}
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              icon={<AiFillSwitcher/>}
              onClick={() => {props.setIndividualCourtControl(!props.individualCourtControl)}}
            >
              {RESOURCES[props.language].SESSION.SIDEBAR.TOGGLE_GAME_MODE}
            </MenuItem>
            <MenuItem
              icon={
                alphaAsc ?
                <ImSortAlphaAsc/> :
                <ImSortAlphaDesc/>
              }
              onClick={sortAlpha}
            >
              {RESOURCES[props.language].SESSION.SIDEBAR.SORT_ALPHABETICALLY}
            </MenuItem>
            <MenuItem
              icon={
                numericAsc ?
                <ImSortNumericAsc/> :
                <ImSortNumbericDesc/>
              }
              onClick={sortNumeric}
            >
              {RESOURCES[props.language].SESSION.SIDEBAR.SORT_BY_GAME_COUNT}
            </MenuItem>
            <MenuItem
              icon={<BiUserVoice/>}
              onClick={() => {props.announceCurrentlyPlaying(-1)}}
            >
              {RESOURCES[props.language].SESSION.SIDEBAR.ANNOUNCE_PLAYERS}
            </MenuItem>
            <MenuItem
              icon={
                props.textToSpeech ?
                <HiVolumeUp/> :
                <HiVolumeOff/>
              }
              onClick={() => {props.setTextToSpeech(!props.textToSpeech)}}
            >
              {RESOURCES[props.language].SESSION.SIDEBAR.TOGGLE_AUTO_ANNOUNCE}
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
        <Menu iconShape="circle">
          <MenuItem
            icon={
              collapsed ?
              <TbLayoutSidebarRightCollapse/> :
              <TbLayoutSidebarLeftCollapse/>
            }
            onClick={toggleCollapsed}
          >
            {RESOURCES[props.language].SESSION.SIDEBAR.COLLAPSE_SIDEBAR}
          </MenuItem>
          <MenuItem
            icon={<BsTranslate/>}
            onClick={() => {props.language == "EN" ?
              props.setLanguage("CH") :
              props.setLanguage("EN")
            }}
          >
            {RESOURCES[props.language].SESSION.SIDEBAR.LANGUAGE}
          </MenuItem>
          <MenuItem
            icon={<FiLogOut/>}
            onClick={showEndSessionModal}
          >
            {RESOURCES[props.language].SESSION.SIDEBAR.END_SESSION}
          </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  )
}

export default Sidebar;