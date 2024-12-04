import styled from 'styled-components';
import Activity, { type ActivityProps } from './activity';

const StyledActivities = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivities = styled.p`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

type ActivitiesProps = { activities: ActivityProps[] | undefined };

function Activities({ activities }: ActivitiesProps) {
  if (!activities?.length) {
    return <NoActivities>No activities today!</NoActivities>;
  }

  return (
    <StyledActivities>
      {activities?.map(activity => (
        <Activity key={activity.id} {...activity} />
      ))}
    </StyledActivities>
  );
}

export default Activities;
