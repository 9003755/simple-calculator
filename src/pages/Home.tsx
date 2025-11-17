import SimpleCalculator from "@/components/SimpleCalculator";

export default function Home() {
  const handleAuthorClick = () => {
    alert('作者：海边的飞行器VX18520403199\n感谢您的使用！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto">
        <SimpleCalculator onAuthorClick={handleAuthorClick} />
      </div>
    </div>
  );
}