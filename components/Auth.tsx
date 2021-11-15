import { Auth, Typography, Button } from '@supabase/ui';
import { createClient } from '@supabase/supabase-js';
import '../styles/supabase.module.css';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Container = (props) => {
	const { user } = Auth.useUser();
	if (user)
		return (
			<>
				<Typography.Text>Signed in: {user.email}</Typography.Text>
				<Button
					block
					onClick={() => props.supabaseClient.auth.signOut()}
				>
					Sign out
				</Button>
			</>
		);
	return props.children;
};

export default function AuthBasic() {
	return (
		<Auth.UserContextProvider supabaseClient={supabase}>
			<Container supabaseClient={supabase}>
				<Auth
					className='auth'
					magicLink={true}
					supabaseClient={supabase}
				/>
			</Container>
		</Auth.UserContextProvider>
	);
}
