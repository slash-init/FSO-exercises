const Notification = ({ message, type }) => {
  if (!message) return null
  return (
    <div className={type === 'success' ? 'notif success' : 'notif error'}>
      {message}
    </div>
  )
}

export default Notification