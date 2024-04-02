Proje Raporu: Meeting Organizer

Proje Tanımı:
Meeting Organizer, .NET Core ve React.js kullanılarak geliştirilmiş bir toplantı
yönetim uygulamasıdır. Uygulama, müşterilerle toplantılar oluşturmayı,
güncellemeyi ve iptal etmeyi sağlar. Projenin back-end kısmında MSSQL
veritabanı bulunmaktadır ve Code First yaklaşımıyla bağlanır. Front-end tarafı
React.js ile geliştirilmiştir.

Başlatma Adımları:
1) Veritabanı Bağlantısı Güncelleme:
- appsettings.json dosyasındaki connection string güncellenmelidir.
- Package Manager Console'da update-database komutu girilmelidir.
2) React.js Front-end Başlatma:
- Terminalde cd .\meetingorganizer\ komutu girilmelidir.
- Sonrasında npm i ve npm run dev komutları çalıştırılmalıdır.
  
Özellikler:
 1) Toplantı Oluşturma, Güncelleme ve İptal Etme:
- Müşterilerle toplantılar oluşturulabilir, güncellenebilir ve iptal edilebilir.
2) Bire Çok İlişki ve Personel Verisi Ekleme:
- Proje içerisinde bire çok ilişki bulunmaktadır.
- Personel tablosuna otomatik veri girişi sağlayacak bir buton bulunmaktadır.
Bu butona basıldığında, rastgele 20 çalışan bilgisi veritabanına eklenir.
3) Toplantı Yöneticisi Seçimi:
- Toplantı oluşturulurken toplantı yöneticisi dropdown list aracılığıyla
seçilebilir.
- Toplantı yöneticisi seçilmeden toplantı oluşturulamaz.
  
Kullanım:
1) Toplantı Oluşturma:
- Müşterilerle toplantılar oluşturmak için "Yeni Toplantı Oluştur" butonuna
tıklanır.
- Gerekli bilgiler girilerek toplantı oluşturulur.
2) Toplantı Güncelleme:
- Varolan bir toplantıyı güncellemek için ilgili toplantı seçilir.
- Güncellenecek bilgiler girilerek toplantı güncellenir.
3) Toplantı İptali:
- Varolan bir toplantıyı iptal etmek için ilgili toplantı seçilir.
- İptal işlemi onaylanır ve toplantı iptal edilir.
4) Personel Verisi Ekleme:
- Otomatik veri girişi butonuna basılarak rastgele 20 çalışan bilgisi veritabanına
eklenir.

Sonuç:
Meeting Organizer, müşterilerle toplantıların etkin bir şekilde yönetilmesini
sağlayan kullanıcı dostu bir uygulamadır. Veritabanı tabloları arasındaki
ilişkilerin düzgün işlemesi, toplantı yöneticisi seçimi gibi detaylar kullanıcı
deneyimini arttırmaktadır. Ayrıca, React.js kullanarak geliştirilen front-end
tarafı, modern ve etkili bir kullanıcı arayüzü sunmaktadır.
