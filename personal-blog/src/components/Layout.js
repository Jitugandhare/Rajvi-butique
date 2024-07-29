import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '20px' }}>{children}</main>
    </div>
  );
}
