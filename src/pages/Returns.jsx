export default function Returns() {
  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full bg-gradient-to-br from-[#f1e6d6] to-[#e6d8c2] 
                      border border-[#d9cab3] rounded-2xl shadow-lg p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2d2a26] mb-6 text-center">
          Returns & Exchange Policy
        </h1>

        <p className="text-[#2d2a26] leading-relaxed mb-6">
          We strive to ensure you are delighted with your purchase. However, if you are
          not completely satisfied, we accept returns within <span className="font-semibold">7 days </span> 
          of delivery. Items must be:
        </p>

        <ul className="list-disc list-inside text-[#2d2a26] space-y-2 mb-6">
          <li>Unused and unworn</li>
          <li>In original packaging</li>
          <li>With all tags intact</li>
        </ul>

        <p className="text-[#2d2a26] leading-relaxed mb-6">
          Once we receive and inspect your return, a refund will be processed to your
          original payment method. Please allow <span className="font-semibold">5–7 business days</span> 
          for the refund to reflect in your account.
        </p>

        <p className="text-[#2d2a26] leading-relaxed">
          For any queries, please reach out to our support team at{" "}
          <a href="mailto:noorchawla44@gmail.com" className="underline text-[#917d63]">
            noorchawla44@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}