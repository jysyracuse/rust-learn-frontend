import { useRouter } from 'next/router';
import { EuiDescriptionList, EuiSpacer, EuiTitle } from '@elastic/eui';

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://.../data`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } };
// }

// export const getStaticProps: GetStaticProps<IUserUrl, IUserUrl> = async ({
//   params,
// }) => {
//   return {
//     props: {
//       id: params!.id,
//     },
//   };
// };

const User: React.FC = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  return (
    <>
      <div>user_id: {userId}</div>
      <EuiDescriptionList
        type="column"
        // listItems={favoriteVideoGames}
        style={{ maxWidth: '400px' }}
      />
    </>
  );
};

export default User;
