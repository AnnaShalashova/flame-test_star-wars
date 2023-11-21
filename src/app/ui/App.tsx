
import { Header } from 'src/widgets/header';
import cls from './App.module.scss';
import { CssBaseline } from '@mui/material';
import { AppRouter } from '../providers/app-router';

export function App() {
  return (
    <section className={cls.App}>
      <CssBaseline />
      <Header />
      <main className="main-content">
        <AppRouter />
      </main>
    </section>
  );
}

export default App;
