export const RESOURCES = {
    HOME: {
        SUMMARY : {
            TITLE : "Newlife Gospel Church Badminton Club",
            MESSAGE : `Welcome to our badminton club. We play badminton together every Sunday after english service in
            the gym. Feel free to join us this upcoming week!`
        }, 
        INFOMATION : {
            LABEL : {
                LOCATION : "Location",
                TIME : "Time",
                CAPACITY : "Capacity",
                DROPIN_COST : "Drop-in Cost",
                MEMBER_COST : "Membership Cost",
                EQUIPMENT : "Equipment"
            },
            INFO : {
                LOCATION : "Address: 2940 Markham Rd, Scarborough, ON M1X 1E6",
                TIME : "1:30pm - 4:30pm every Sunday",
                CAPACITY : "Maximum of 30 people in the gym at once",
                DROPIN_COST : "$6/Sunday",
                MEMBER_COST : "$5/Sunday, paid in full on the first Sunday of each month",
                EQUIPMENT : `Yellow nylon plastic shuttlecocks are provided. Badminton Shoes are mandatory on court.
                Rackets and other equipment are not provided.`
            }
        }
    },
    CHECKIN : {
        INACTIVE : {
            TITLE : "Oh no!",
            MESSAGE : "There is no live session. Please notify admin to start a new session to check-in 🙂"
        },

        MEMBER : {
            TITLE : "Members",
            SUBTITLE : "Already a member?",
            MESSAGE : "Check-in using your phone number below",
            ERROR_NOT_FOUND : "Phone number not found! Please speak to admin.",
            BUTTON : "Check In"
        },

        DROPIN : {
            TITLE : "Guest",
            SUBTITLE : "Dropping in?",
            MESSAGE : "Enter your full name and click drop in",
            ERROR_TOO_SHORT : "Full name too short (min 4 char)",
            ERROR_TOO_LONG : "Full name too long (max 20 char)",
            ERROR_TAKEN : "Full name already taken!",
            BUTTON : "Drop In",
            REJECT : "Admin has denied your access"
        }
    },
    SESSION : {
        LOGIN : {
            CREATE_SESSION : "Create New Badminton Session",
            ENTER_SESSION : "Access Live Session",
            ERROR_NOT_FOUND : "Access Denied",
            SESSION_TEXT : "Current Session",
            SESSION_ACTIVE : "Active",
            SESSION_INACTIVE : "Inactive"

        },
        APPROVAL : {
            TITLE: "Drop-in players awaiting for approval"
        },
        MANAGE : {
            TITLE: "Manage approved players"
        },
        END : {
            TITLE : "Are you sure you want to end session?",
            MESSAGE : `Ending will close this session and remove all players from this session. This action cannot be
            reverted and a new session will have to be created.`
        }
    },
    QR : {
        TITLE : "Use your phone to check-in",
        SUBTITLE : "Scan the QR Code below or go to: ",
        URL : "https://bit.ly/39gvmzG",
        LINK : "https://jonathanchang1025.github.io/court-manager/#/checkin"
    }
}