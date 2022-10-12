
import { pink, yellow , grey, blue} from "@mui/material/colors";

export default  {
    palette : {
        background : {
            default : '#fafafa'
        },
        
        primary :{
            main : "#bdbdbd"
        },
        secondary : pink,
       
    },
    components: {
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: "#fce4ec"
            }
          }
        }
      }
}