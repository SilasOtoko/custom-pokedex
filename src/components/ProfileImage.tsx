import { User } from 'firebase/auth';
import { useUserAvatar } from '../hooks/useUserAvatar';

interface Props {
  user: User;
  className?: string;
}

function ProfileImage({ user, className }: Props) {
  const { showFallback, initial, onError } = useUserAvatar(user);

  if (showFallback) {
    return (
      <div className="w-16 h-16 rounded-full border-2 border-red-400 bg-gray-200 flex items-center justify-center shrink-0">
        <span className="text-xl font-bold text-gray-600">{initial}</span>
      </div>
    );
  }

  return (
    <img
      src={user.photoURL}
      alt={user.displayName}
      className="w-16 h-16 rounded-full border-2 border-red-400"
      onError={onError}
    />
  );
}

export default ProfileImage;
