import Head from 'next/head';
import { useRouter } from 'next/router';
import { pageMetadata } from '@/data/pageMetaData';

const Meta = () => {
	const router = useRouter();
	const { asPath } = router;
	const metadata = pageMetadata[asPath] || {};

	const {
		title = 'Sweet JuanJos',
		description = 'Default Description',
		ogImage = 'https://sweet-juan-jos.vercel.app/images/logo/transparent-juanjos.png',
		keywords = 'default, keywords',
	} = metadata;

	return (
		<Head>
			<title>{title}</title>
			<link rel='shortcut icon' href='/Images/home-page/innerChild.jpg' />
            <meta name='keywords' content={keywords} />
			<meta name='description' content={description} />
			<meta property='og:title' content={title} />
			<meta property='og:type' content='website' />
			<meta property='og:description' content={description} />
			<meta property='og:image' content={ogImage} />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<link rel='icon' href='/favicon.png' />
			<meta name='author' content='Tami Schiltz' />
		</Head>
	);
};

export default Meta;
