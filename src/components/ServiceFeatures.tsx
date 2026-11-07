
import {
  Truck,
  ShieldCheck,
  Headset,
  Percent,
} from "lucide-react";

function ServiceFeatures() {
  const features = [
    {
      icon: Truck,
      title: "Pengiriman Aman",
      description: "Cepat & Terpercaya",
    },
    {
      icon: ShieldCheck,
      title: "Transaksi Aman",
      description: "Pembayaran Terlindungi",
    },
    {
      icon: Headset,
      title: "Layanan Bantuan",
      description: "Siap Membantu Anda",
    },
    {
      icon: Percent,
      title: "Banyak Promo",
      description: "Diskon Setiap Hari",
    },
  ];

  return (
    <section className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:grid-cols-4 md:p-5">

      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="flex items-center gap-3 border-gray-100 p-2 md:border-r last:border-none"
          >
            <Icon
              size={35}
              className="shrink-0 text-emerald-700"
            />

            <div>
              <h3 className="text-xs font-bold md:text-sm">
                {feature.title}
              </h3>

              <p className="mt-1 text-[10px] text-gray-500 md:text-xs">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}

    </section>
  );
}

export default ServiceFeatures;
