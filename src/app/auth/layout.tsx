import Footer from "@/components/shared/Footer";
import AuthHeader from "@/components/shared/AuthHeader";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen flex-col bg-[#f5f5f5]">
			<AuthHeader />
			<main className="flex-1">{children}</main>
			<Footer variant="compact" />
		</div>
	);
}
