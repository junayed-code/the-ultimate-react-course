import Row from '@ui/row';
import Container from '@ui/container';
import UpdateSettingsForm from '@features/settings/update-form';

function Settings() {
  return (
    <Container>
      <Row $direction="vertical" $align="stretch" $gap="2rem">
        <h3>Update hotel settings</h3>
        <UpdateSettingsForm />
      </Row>
    </Container>
  );
}

export default Settings;
