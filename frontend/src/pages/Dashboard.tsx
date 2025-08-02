import { useEffect, useState } from 'react'
import '../App.css'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContents'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const {contents, refresh} = useContent()

  useEffect(() => {
    refresh()
  }, [modalOpen])


  return (
    <div>
      <Sidebar/>

        <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false)
        }}/>
        <div className='flex justify-end gap-4'>
          <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon />}/>
          <Button onClick={() => {
            setModalOpen(true)
          }} variant='primary' text='Add Content' startIcon={<PlusIcon />}/>
        </div>
        
{/* py-4 ml-4  py-4 flex-wrap */}
        <div className="flex gap-8 py-4 flex-wrap">
          {/* <Card type='twitter' title='DK' link='https://x.com/merishabh_singh/status/1948774653469630578'/>
          <Card type='youtube' title='Surah Yaseen' link='https://www.youtube.com/watch?v=Q--H5uqHP5s' />
          <Card type='youtube' title='Surah Yaseen' link='https://www.youtube.com/watch?v=Q--H5uqHP5s' /> */}

          {contents.map(({title, type, link}) => 
          <Card type={type} title={title} link={link} />
          )}

        </div>
        
        </div>
        
      </div>


    
  )
}

export default Dashboard
