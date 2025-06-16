<template>
  <button class="hamburger ff-open-sans-700">
    MENU
    <span class="line-wrap">
      <span class="line" />
      <span class="line" />
      <span class="line" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.hamburger {
  position: fixed;
  top: 0.875rem;
  right: 3.75rem;
  padding: 0.5rem 1rem;
  background: var(--white);
  border: 2px solid var(--black);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0.25rem 0.25rem 0 var(--black);
  outline: 0.125rem solid var(--white);
}
.line-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.line {
  width: 1.1rem;
  height: 2px;
  background-color: var(--black);
  border-radius: 0.25rem;
}
</style>
