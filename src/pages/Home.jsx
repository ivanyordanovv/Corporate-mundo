const PRODUCTS = [
  {
    id: 'suitcase',
    name: 'Executive Suitcase',
    description: 'For when you need to PUSH your way through airport security. Fits one cleaver. Business class.',
    image: 'https://placehold.co/320x200/1e3a5f/c9a227?text=Suitcase',
  },
  {
    id: 'telephone',
    name: 'Corporate Telephone',
    description: 'Call the office. Tell them you\'re going in. Then hang up and PUSH.',
    image: '/images/telephone.jpg',
  },
  {
    id: 'light-snack',
    name: 'Light Snack',
    description: 'ADC on the menu. One shot, one snack. Mundo approved.',
    image: '/images/adc_snack.jpg',
  },
  {
    id: 'big-snack',
    name: 'Big Snack (Tower)',
    description: 'The main course. Tower-sized hunger. PUSH PUSH PUSH.',
    image: 'https://placehold.co/320x200/1e3a5f/c9a227?text=Big+Snack',
  },
]

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <h1 className="hero__title">
          PUSH
          <br />
          PUSH
          <br />
          PUSH
        </h1>
        <p className="hero__tagline">
          Go in. Go forward. Kill everything. Corporate policy.
        </p>
      </section>

      <section className="products">
        <h2 className="products__title">Mundo&apos;s Essentials</h2>
        <div className="products__grid">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className={`product-card ${product.id === 'light-snack' ? 'product-card--full-image' : ''}`}
            >
              <div className="product-card__image-wrap">
                <img
                  src={product.image}
                  alt=""
                  className="product-card__image"
                />
              </div>
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__desc">{product.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
