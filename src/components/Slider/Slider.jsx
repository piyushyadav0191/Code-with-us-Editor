import { GiSplitCross } from 'react-icons/gi'

const Sidebar = ({close}) => {
  return <aside className='sidebar' >
   <div className='closeButton' onClick={() => close()} >
   <GiSplitCross color='#fff' size={50}/>
     </div>
 <h1 style={{color: 'white'}}>Compiled code will show here </h1>
</aside>

}


export default Sidebar;
