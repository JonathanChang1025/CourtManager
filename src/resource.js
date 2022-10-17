export const RESOURCES = {
  HOME: {
    SUMMARY: {
      TITLE: "Newlife Gospel Church Badminton Club",
      MESSAGE: `Welcome to our badminton club. We play badminton together every Sunday after english service in
        the gym. Feel free to join us this upcoming week!`,
    },
    INFOMATION: {
      LABEL: {
        LOCATION: "Location",
        TIME: "Time",
        CAPACITY: "Capacity",
        DROPIN_COST: "Drop-in Cost",
        MEMBER_COST: "Membership Cost",
        EQUIPMENT: "Equipment",
      },
      INFO: {
        LOCATION: "Address: 2940 Markham Rd, Scarborough, ON M1X 1E6",
        TIME: "1:30pm - 4:30pm every Sunday",
        CAPACITY: "Maximum of 30 people in the gym at once",
        DROPIN_COST: "$6/Sunday",
        MEMBER_COST: "$5/Sunday, paid in full on the first Sunday of each month",
        EQUIPMENT: `Yellow nylon plastic shuttlecocks are provided. Badminton Shoes are mandatory on court.
          Rackets and other equipment are not provided.`,
      }
    }
  },
  CHECKIN: {
    INACTIVE: {
      TITLE: "Oh no!",
      MESSAGE: "There is no live session. Please notify admin to start a new session to check-in 🙂",
    },
    MEMBER: {
      TITLE: "Members",
      SUBTITLE: "Already a member?",
      MESSAGE: "Check-in using your phone number below",
      ERROR_NOT_FOUND: "Phone number not found! Please speak to admin.",
      BUTTON: "Check In",
    },
    DROPIN: {
      TITLE: "Guest",
      SUBTITLE: "Dropping in?",
      MESSAGE: "Enter your full name and click drop in",
      ERROR_TOO_SHORT: "Full name too short (min 4 char)",
      ERROR_TOO_LONG: "Full name too long (max 20 char)",
      ERROR_NAME_TAKEN: "Full name already taken!",
      ERROR_WRONG_FORMAT: "Please enter in this format 'John Doe'",
      ERROR_LETTERS_ONLY: "English letters only",
      BUTTON: "Drop In",
      REJECT: "Admin has denied your access",
    }
  },
  SESSION: {
    LOGIN: {
      CREATE_SESSION: "Create New Badminton Session",
      ENTER_SESSION: "Access Live Session",
      ERROR_NOT_FOUND: "Access Denied",
      SESSION_TEXT: "Current Session",
      SESSION_ACTIVE: "Active",
      SESSION_INACTIVE: "Inactive",
    },
    APPROVAL: {
      TITLE: "Drop-in players awaiting for approval",
    },
    MANAGE: {
      TITLE: "Manage approved players",
    },
    END: {
      TITLE: "Are you sure you want to end session?",
      MESSAGE: `Ending will close this session and remove all players from this session. This action cannot be
        reverted and a new session will have to be created.`,
    },
    SIDEBAR: {
      HOME: "Home",
      AWAITING_APPROVAL: "Awaiting Approval",
      ADD_PLAYERS: "Add Players",
      MANAGE_PLAYERS: "Manage Players",
      TOGGLE_GAME_MODE: "Toggle Game Mode",
      SORT_ALPHABETICALLY: "Sort Alphabetically",
      SORT_BY_GAME_COUNT: "Sort by Game Count",
      ANNOUNCE_PLAYERS: "Announce Players",
      TOGGLE_AUTO_ANNOUNCE: "Toggle Auto Announce",
      COLLAPSE_SIDEBAR: "Collapse Sidebar",
      LANGUAGE: "En/Ch",
      END_SESSION: "End Session",
    },
  },
  QR: {
    TITLE: "Use your phone to check-in",
    SUBTITLE: "Scan the QR Code below or go to: ",
    URL: "https://bit.ly/39gvmzG",
    LINK: "https://jonathanchang1025.github.io/court-manager/#/checkin",
  },
  EN: {
    HOME: {
      SUMMARY: {
        TITLE: "Newlife Gospel Church Badminton Club",
        MESSAGE: `Welcome to our badminton club. We play badminton together every Sunday after english service in
          the gym. Feel free to join us this upcoming week!`,
      },
      INFOMATION: {
        LABEL: {
          LOCATION: "Location",
          TIME: "Time",
          CAPACITY: "Capacity",
          DROPIN_COST: "Drop-in Cost",
          MEMBER_COST: "Membership Cost",
          EQUIPMENT: "Equipment"
        },
        INFO: {
          LOCATION: "Address: 2940 Markham Rd, Scarborough, ON M1X 1E6",
          TIME: "1:30pm - 4:30pm every Sunday",
          CAPACITY: "Maximum of 30 people in the gym at once",
          DROPIN_COST: "$6/Sunday",
          MEMBER_COST: "$5/Sunday, paid in full on the first Sunday of each month",
          EQUIPMENT: `Yellow nylon plastic shuttlecocks are provided. Badminton Shoes are mandatory on court.
            Rackets and other equipment are not provided.`,
        }
      }
    },
    CHECKIN: {
      INACTIVE: {
        TITLE: "Oh no!",
        MESSAGE: "There is no live session. Please notify admin to start a new session to check-in 🙂",
      },
      MEMBER: {
        TITLE: "Members",
        SUBTITLE: "Already a member?",
        MESSAGE: "Check-in using your phone number below",
        ERROR_NOT_FOUND: "Phone number not found! Please speak to admin.",
        BUTTON: "Check In",
      },
      DROPIN: {
        TITLE: "Guest",
        SUBTITLE: "Dropping in?",
        MESSAGE: "Enter your full name and click drop in",
        ERROR_TOO_SHORT: "Full name too short (min 4 char)",
        ERROR_TOO_LONG: "Full name too long (max 20 char)",
        ERROR_NAME_TAKEN: "Full name already taken!",
        ERROR_WRONG_FORMAT: "Please enter in this format 'John Doe'",
        ERROR_LETTERS_ONLY: "English letters only",
        BUTTON: "Drop In",
        REJECT: "Admin has denied your access",
      }
    },
    SESSION: {
      LOGIN: {
        CREATE_SESSION: "Create New Badminton Session",
        ENTER_SESSION: "Access Live Session",
        ERROR_NOT_FOUND: "Access Denied",
        SESSION_TEXT: "Current Session",
        SESSION_ACTIVE: "Active",
        SESSION_INACTIVE: "Inactive",
      },
      APPROVAL: {
        TITLE: "Drop-in players awaiting for approval",
        REJECT: "Reject",
        APPROVE: "Approved",
      },
      ADD_PLAYERS: {
        TITLE: "Add Players",
        DROPIN: "Drop-in",
        DROPIN_PLACEHOLDER: "Enter Full Name",
        DROPIN_ADD: "Add",
        MEMBERS: "Members",
      },
      MANAGE: {
        TITLE: "Manage approved players",
        KICK: "Kick",
      },
      END: {
        TITLE: "Are you sure you want to end session?",
        MESSAGE: `Ending will close this session and remove all players from this session. This action cannot be
          reverted and a new session will have to be created.`,
        CANCEL: "Cancel",
        END_SESSION: "End Session",
      },
      LABELS: {
        BATCH_CLEAR_COURTS: "➡clear all courts➡",
        BATCH_START_GAMES: "⬆ start next games ⬆",
        INDIVIDUAL_CLEAR_COURT: "➡",
        INDIVIDUAL_START_GAME: "start game",
        CURRENTLY_PLAYING: "Currently Playing",
        IN_QUEUE: "In Queue",
        AVAILABLE_PLAYERS: "Available Players",
        COURT: "court",
        COURT_SELECTED: "selected",
      },
      SIDEBAR: {
        HOME: "Home",
        AWAITING_APPROVAL: "Awaiting Approval",
        ADD_PLAYERS: "Add Players",
        MANAGE_PLAYERS: "Manage Players",
        TOGGLE_GAME_MODE: "Toggle Game Mode",
        SORT_ALPHABETICALLY: "Sort Alphabetically",
        SORT_BY_GAME_COUNT: "Sort by Game Count",
        ANNOUNCE_PLAYERS: "Announce Players",
        TOGGLE_AUTO_ANNOUNCE: "Toggle Auto Announce",
        COLLAPSE_SIDEBAR: "Collapse Sidebar",
        LANGUAGE: "中文",
        END_SESSION: "End Session",
      },
    },
    QR: {
      TITLE: "Use your phone to check-in",
      SUBTITLE: "Scan the QR Code below or go to: ",
      URL: "https://bit.ly/39gvmzG",
      LINK: "https://jonathanchang1025.github.io/court-manager/#/checkin",
    }
  },
  CH: {
    HOME: {
      SUMMARY: {
        TITLE: "Newlife Gospel Church Badminton Club",
        MESSAGE: `Welcome to our badminton club. We play badminton together every Sunday after english service in
          the gym. Feel free to join us this upcoming week!`,
      },
      INFOMATION: {
        LABEL: {
          LOCATION: "Location",
          TIME: "Time",
          CAPACITY: "Capacity",
          DROPIN_COST: "Drop-in Cost",
          MEMBER_COST: "Membership Cost",
          EQUIPMENT: "Equipment",
        },
        INFO: {
          LOCATION: "Address: 2940 Markham Rd, Scarborough, ON M1X 1E6",
          TIME: "1:30pm - 4:30pm every Sunday",
          CAPACITY: "Maximum of 30 people in the gym at once",
          DROPIN_COST: "$6/Sunday",
          MEMBER_COST: "$5/Sunday, paid in full on the first Sunday of each month",
          EQUIPMENT: `Yellow nylon plastic shuttlecocks are provided. Badminton Shoes are mandatory on court.
            Rackets and other equipment are not provided.`,
        }
      }
    },
    CHECKIN: {
      INACTIVE: {
        TITLE: "Oh no!",
        MESSAGE: "There is no live session. Please notify admin to start a new session to check-in 🙂",
      },
      MEMBER: {
        TITLE: "Members",
        SUBTITLE: "Already a member?",
        MESSAGE: "Check-in using your phone number below",
        ERROR_NOT_FOUND: "Phone number not found! Please speak to admin.",
        BUTTON: "Check In",
      },
      DROPIN: {
        TITLE: "Guest",
        SUBTITLE: "Dropping in?",
        MESSAGE: "Enter your full name and click drop in",
        ERROR_TOO_SHORT: "Full name too short (min 4 char)",
        ERROR_TOO_LONG: "Full name too long (max 20 char)",
        ERROR_NAME_TAKEN: "Full name already taken!",
        ERROR_WRONG_FORMAT: "Please enter in this format 'John Doe'",
        ERROR_LETTERS_ONLY: "English letters only",
        BUTTON: "Drop In",
        REJECT: "Admin has denied your access",
      }
    },
    SESSION: {
      LOGIN: {
        CREATE_SESSION: "Create New Badminton Session",
        ENTER_SESSION: "Access Live Session",
        ERROR_NOT_FOUND: "Access Denied",
        SESSION_TEXT: "Current Session",
        SESSION_ACTIVE: "Active",
        SESSION_INACTIVE: "Inactive",
      },
      APPROVAL: {
        TITLE: "等待批准的Drop-In球員",
        REJECT: "拒絕",
        APPROVE: "批准",
      },
      ADD_PLAYERS: {
        TITLE: "添加球員",
        DROPIN: "添加Drop-In球員",
        DROPIN_PLACEHOLDER: "輸入英文全名",
        DROPIN_ADD: "添加",
        MEMBERS: "會員",
      },
      MANAGE: {
        TITLE: "管理已批准的球員",
        KICK: "剔除",
      },
      END: {
        TITLE: "您確定要登出嗎？",
        MESSAGE: "登出將關閉此打球時段並刪除所有玩家。這個動作不能還原並且必須重新增加球員。",
        CANCEL: "取消",
        END_SESSION: "確認登出",
      },
      LABELS: {
        BATCH_CLEAR_COURTS: "➡清空所有球場➡",
        BATCH_START_GAMES: "⬆ 開始下一場比賽 ⬆",
        INDIVIDUAL_CLEAR_COURT: "➡",
        INDIVIDUAL_START_GAME: "開始",
        CURRENTLY_PLAYING: "目前在打的場次",
        IN_QUEUE: "等待上場",
        AVAILABLE_PLAYERS: "可下場的球員",
        COURT: "場",
        COURT_SELECTED: "選擇",
      },
      SIDEBAR: {
        HOME: "主頁",
        AWAITING_APPROVAL: "批准Drop-In球員加入",
        ADD_PLAYERS: "添加球員",
        MANAGE_PLAYERS: "管理球員",
        TOGGLE_GAME_MODE: "切換打球計時模式",
        SORT_ALPHABETICALLY: "按字母順序排序",
        SORT_BY_GAME_COUNT: "按已打場次數排序",
        ANNOUNCE_PLAYERS: "宣布上場球員",
        TOGGLE_AUTO_ANNOUNCE: "開/關 自動宣布上場球員",
        COLLAPSE_SIDEBAR: "收起目錄",
        LANGUAGE: "English",
        END_SESSION: "登出",
      },
    },
    QR: {
      TITLE: "Use your phone to check-in",
      SUBTITLE: "Scan the QR Code below or go to: ",
      URL: "https://bit.ly/39gvmzG",
      LINK: "https://jonathanchang1025.github.io/court-manager/#/checkin",
    }
  }
}
