'use client';

export default function ClientB() {
  console.log('ClientB loaded');
  return <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'blue',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        fontWeight: 'bold',
        }}>CLIENT B</div>;
}
