import { Button as MaterialButton } from '@material-tailwind/react';
import { LockIcon, Plus, UnlockIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Checkbox } from '../ui/checkbox';

const legalizeChars = new Map([
  [' ', '-'],
  ['ą', 'a'],
  ['ć', 'c'],
  ['ę', 'e'],
  ['ó', 'o'],
  ['ś', 's'],
  ['ł', 'l'],
  ['ż', 'z'],
  ['ź', 'z'],
  ['ń', 'n']
]);

const legalizeName = (name: string): string => {
  name = name.toLowerCase().trimStart().trimEnd();
  const buffer = name.split('');
  for (let i = 0; i < buffer.length; i += 1) {
    const char = buffer[i];
    if (char === ' ') {
      buffer[i] = '-';
    }
    if (buffer[i - 1] === '-' && buffer[i] === '-') {
      throw Error("Invalid");
    }
    if (legalizeChars.has(char)) {
      buffer[i] = legalizeChars.get(char) ?? '';
    }
  }
  return buffer.join("").trim();
};

const DialogCreateProject = () => {
  const [projectPrivate, setProjectPrivate] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDisplayname, setProjectDisplayname] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MaterialButton
          variant='gradient'
          color='green'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className='p-2 m-1 center'
        >
          <Plus width={16} height={16} /> Utwórz projekt
        </MaterialButton>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Utwórz projekt</DialogTitle>
          <DialogDescription>
            Utwórz projekt na swoim profilu tutaj. Kliknij utwórz kiedy już
            skończysz.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='center flex-col'>
            <h1 className='font-title text-2xl flex flex-row gap-2 justify-center items-center'>{ projectPrivate ? <LockIcon/> : <UnlockIcon/>}{projectDisplayname}</h1>
            <p className='text-center'>{projectDescription}</p>
          </div>
          
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Nazwa projektu
            </Label>
            <Input
              id='name'
              defaultValue='Przykładowy projekt'
              className='col-span-3'
              value={projectDisplayname}
              onChange={(event) => {
                const displayName = event.target.value;
                setProjectName(legalizeName(displayName));
                setProjectDisplayname(displayName);
              }}
            />
          </div>
          <p className='w-full text-center text-sm text-muted-foreground'>
            Projekt będzie wyświetlany pod nazwą: <b>{projectName}</b>
          </p>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Opis <span className='text-muted-foreground'>(opcjonalne)</span>
            </Label>
            <Input
              id='description'
              defaultValue=''
              placeholder='Przykładowy projekt napisany...'
              className='col-span-3'
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='private' className='text-right'>
              Prywatny
            </Label>
            <Checkbox id='private' className='col-span-3' checked={projectPrivate} onClick={(_) => setProjectPrivate(!projectPrivate)} />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Utwórz projekt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DialogCreateProject };
