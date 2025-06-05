'use client';

export default function ClientA() {
    console.log('ClientA loaded');
  return (
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'red',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        fontWeight: 'bold',
        }}>
            CLIENT A
        </div>
  )
}
