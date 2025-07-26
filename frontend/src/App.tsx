
import { useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { CreateContentModal } from './components/CreateContentModal'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className='p-4'>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false)
      }}/>
      <div className='flex justify-end gap-4'>
        <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon />}/>
        <Button onClick={() => {
          setModalOpen(true)
        }} variant='primary' text='Add Content' startIcon={<PlusIcon />}/>
      </div>
      

      <div className="flex gap-6">
        <Card type='twitter' title='DK' link='https://x.com/merishabh_singh/status/1948774653469630578'/>
        <Card type='youtube' title='Surah Yaseen' link='https://www.youtube.com/watch?v=Q--H5uqHP5s' />
      </div>
      
    </div>
  )
}

export default App
