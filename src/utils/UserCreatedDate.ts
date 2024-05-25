import { User } from '@/utils/FetchProfile';

const UserCreatedDate = (user: User) => {
  const created_at = new Date(user.created_at);

  const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień'
  ];

  return `${months[created_at.getMonth()]} ${created_at.getFullYear()}`;
};

export { UserCreatedDate };
