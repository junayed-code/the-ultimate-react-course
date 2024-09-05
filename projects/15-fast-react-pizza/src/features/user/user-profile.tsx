import { useAppSelector } from '@/store/hooks';

function UserProfile() {
  const username = useAppSelector((store) => store.user.username);

  return (
    <div className="hidden text-right md:block md:w-1/2">
      <span className="text-sm font-semibold">{username}</span>
    </div>
  );
}

export default UserProfile;
