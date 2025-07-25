
import './App.css'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {

  return (
    <div>
      <Button variant='primary' text='Add Content' startIcon={<PlusIcon />}/>
      <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon />}/>

      <div className="flex gap-6">
        <Card type='youtube' title='Surah Yaseen' link='https://www.youtube.com/watch?v=Q--H5uqHP5s' />
        <Card type='twitter' title='DK' link='https://x.com/merishabh_singh/status/1948774653469630578'/>
      </div>
      
    </div>
  )
}

export default App
