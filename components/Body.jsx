import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Landing from "./Landing"
import BubbleChart from "./SpecializedSkillsBubbleChart"
import EducationPieChart from "./EducationRequirementPieChart"
import JobPostingsTable from "./JobPostingsVsHiresTable"
import JobMap from "./MedianSalaryMap"
import TopSoftwareSkills from "./SoftwareSkillsBubbleChart"


const Body = () =>{ 
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Landing/>
        },
        {
            path:"/1",
            element:<JobMap/>
        },
        {
            path:"/2",
            element:<BubbleChart/>
        },
        {
            path:"/3",
            element:<EducationPieChart/>
        },
        {
            path:"/4",
            element:<JobPostingsTable/>
        },
        {
            path:"/5",
            element:<TopSoftwareSkills/>
        }
    ])

    
    return(
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body