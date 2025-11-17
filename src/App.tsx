import SimpleCalculator from './components/SimpleCalculator'

function App() {
  const handleAuthorClick = () => {
    window.open('https://space.bilibili.com/18520403199', '_blank')
  }

  return (
    <SimpleCalculator onAuthorClick={handleAuthorClick} />
  )
}

export default App