import React from 'react';

interface LegalViewProps {
  type: 'terms' | 'privacy';
  lang: 'bn' | 'en';
}

export const LegalView: React.FC<LegalViewProps> = ({ type, lang }) => {
  if (type === 'terms') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 font-['Hind_Siliguri',sans-serif]">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
            DarkHUB Legal Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 mt-1">
            {lang === 'bn' ? 'শর্তাবলী ও নীতিমালা (Terms & Conditions)' : 'Terms & Conditions'}
          </h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">Effective Date: October 2026 · Version 2.4</p>
        </div>

        <div className="space-y-6 text-sm text-zinc-700 leading-relaxed border-t border-zinc-200 pt-6">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900">১. প্ল্যাটফর্মের উদ্দেশ্য ও ঐতিহাসিক সংরক্ষণ</h3>
            <p>
              DarkHUB একটি ওপেন ঐতিহাসিক তথ্যভাণ্ডার। এই প্ল্যাটফর্মের মূল লক্ষ্য হলো অতীত ও বর্তমানের সাইবার ইতিহাস, সামাজিক মাধ্যম আন্দোলন ও সাইবার ডিফেন্স টিমের কার্যকলাপ নথিভুক্ত রাখা। কোনো ধরনের ক্ষতিকর সাইবার আক্রমণ পরিচালনা বা অবৈধ নির্দেশনার প্রচার এই প্ল্যাটফর্মের উদ্দেশ্য নয়।
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900">২. বায়োডাটা জমা দেওয়ার নীতিমালা</h3>
            <p>
              ব্যবহারকারীগণ স্বেচ্ছায় তাদের অ্যালিয়াস, টিম ইনফো ও অপারেশনাল রেকর্ড জমা দিয়ে থাকেন। কোনো ব্যক্তির প্রকৃত ব্যক্তিগত গোপনীয় তথ্য (যেমন এনআইডি, বাড়ির ঠিকানা, ব্যাংক তথ্য) প্রকাশ করা কঠোরভাবে নিষিদ্ধ।
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900">৩. দায়মুক্তি ও কপিরাইট</h3>
            <p>
              DarkHUB কোনো টিমের পূর্ববর্তী কার্যক্রমের জন্য ব্যক্তিগত দায়ভার গ্রহণ করে না। সকল তথ্য ঐতিহাসিক রেফারেন্স হিসেবে আর্কাইভ করা হয়। কপিরাইট বা রেকর্ড সংশোধনের জন্য dmca.bangla@gmail.com এ যোগাযোগ করুন।
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 font-['Hind_Siliguri',sans-serif]">
      <div>
        <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
          DarkHUB Privacy Guard
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 mt-1">
          {lang === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">Zero-Log Philosophy · Updated 2026</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-700 leading-relaxed border-t border-zinc-200 pt-6">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-zinc-900">১. কোনো আইপি লগিং নেই (Zero-Log Policy)</h3>
          <p>
            DarkHUB ভিজিটরদের আইপি অ্যাড্রেস, ব্রাউজিং ফিঙ্গারপ্রিন্ট বা ট্র্যাকিং কুকি সার্ভারে সংরক্ষণ করে না। সাইবার স্পেসের স্বাধীনতা ও নাম প্রকাশে অনিচ্ছুক থাকার নীতিকে আমরা সর্বোচ্চ প্রাধান্য দিই।
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-zinc-900">২. জমা দেওয়া বায়োডাটা সুরক্ষা</h3>
          <p>
            জমা দেওয়া বায়োডাটা ডাটাবেজে এনক্রিপ্ট করে সংরক্ষণ করা হয়। আপনি যেকোনো সময় আপনার প্রোফাইল মুছে ফেলা বা সংশোধনের অনুরোধ পাঠাতে পারেন।
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-zinc-900">৩. যোগাযোগ ও অপসারণ প্রক্রিয়া</h3>
          <p>
            যেকোনো প্রাইভেসি সংক্রান্ত প্রশ্ন বা নিজের ডেটা ডিলিস্ট করতে চাইলে সরাসরি অ্যাডমিনের সাথে যোগাযোগ করুন: dmca.bangla@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
};
