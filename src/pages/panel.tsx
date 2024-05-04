import { Folder, Newspaper, User, UserCheck } from 'lucide-react';

import { isDev } from '@/lib/utils';

import DefaultLayout from '@/components/layout/DefaultLayout';
import Seo from '@/components/Seo';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Panel() {
  return (
    <DefaultLayout>
      <Seo templateTitle='Panel administratora' />
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
        <div className='mx-auto grid w-full max-w-6xl gap-2'>
          <h1 className='text-3xl font-title'>Panel administratora</h1>
        </div>
        <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
          <div className='flex flex-col justify-between h-full'>
            <nav
              className='text-sm text-muted-foreground h-full gap-4 flex flex-col'
              x-chunk='dashboard-04-chunk-0'
            >
              <p className='font-semibold text-primary'>Główne</p>
              <p className='hover:underline'>Użytkownicy</p>
              <p className='hover:underline'>Projekty</p>
              <p className='hover:underline'>Posty</p>
              <p className='hover:underline'>Zgłoszenia</p>
              <p className='hover:underline'>Konkurs</p>
            </nav>
            <p className='font-light text-muted-foreground text-sm'>CodeFest 05.05.24r { isDev ? "DEVELOPMENT" : ""}</p>
          </div>
          <div className='flex flex-col gap-6'>
          <div className='flex gap-6'>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium pr-4">
                Ilośc użytkowników
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                +20.1% od wczoraj
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium pr-4">
                Ilość projektów
              </CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium pr-4">
                Ilość postów
              </CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium pr-4">
                Aktywnych użytkowników (7dni)
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          </div>    
          <div className="mockup-code bg-gray-900 max-h-200">    
            <pre data-prefix=">"><code>Infomacja</code></pre> 
            
            <pre data-prefix="+" className="text-success"><code>Projekt | Nowy projekt {"{projekt}"} od {"{użytkownik}"}</code></pre>  
            <pre data-prefix="=" className="text-warning"><code>Projekt | Zaaktualizowany projekt {"{projekt}"} od {"{użytkownik}"}</code></pre>
            <pre data-prefix="-" className="text-error"><code>Projekt | Usunięty projekt {"{projekt}"} od {"{użytkownik}"}</code></pre>
            
            <pre data-prefix="+" className="text-success"><code>Użytkownik | Nowy Użytkownik {"{użytkownik}"}</code></pre>  
            <pre data-prefix="=" className="text-warning"><code>Użytkownik | Zaaktualizowany Użytkownik {"{użytkownik}"}</code></pre>
            <pre data-prefix="-" className="text-error"><code>Użytkownik | Usunięty Użytkownik {"{użytkownik}"}</code></pre>
            
            <pre data-prefix=">"><code>Nowe zalogowanie 0.0.0.0 (MODERR)</code></pre> 
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
);
}
