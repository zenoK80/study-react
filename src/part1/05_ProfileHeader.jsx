// [미션] Props 구조 분해 & 컴포넌트 합성 - 2026.08.29(토)
// [학습목표] 작은 컴포넌트들을 조합(Composition)하여 큰 UI를 구축하고, Props 구조 분해 할당을 적용한다.

// 1. Emoji 컴포넌트
function Emoji({ symbol }) {
  return <span>{symbol}</span>;
}

// 2. Title 컴포넌트
function Title({ name }) {
  return <h2>Welcome, {name}!</h2>;
}

// 3. UserInfo 컴포넌트
function UserInfo({ age, country }) {
  return (
    <p>
      Age: {age} | Country: {country}
    </p>
  );
}

// 4. ProfileHeader 컴포넌트 (하위 컴포넌트 합성)
function ProfileHeader({ name, age, country }) {
  return (
    <header>
      <Emoji symbol="🧑‍💻" />
      <Title name={name} />
      <UserInfo age={age} country={country} />
    </header>
  );
}

export default ProfileHeader;
