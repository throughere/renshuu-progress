import "#lib/mastery-effects.css";

// Effects for 75-100% mastery kanji, mapped to their classes in mastery-effects.css
export const mastery_effects = {
  Shine: "fx-shine",
  Sparkle: "fx-sparkle",
  Gold: "fx-gold",
  Holo: "fx-holo",
  Platinum: "fx-platinum",
  "Shine + sparkle": "fx-shine fx-sparkle",
  "Color sparkle": "fx-sparkle-color",
  Fire: "fx-fire",
};

export type MasteryEffect = keyof typeof mastery_effects;

const storage_key = "mastery-effect";

export const mastery_effect = $state<{ current: MasteryEffect }>({
  current: "Shine",
});

export function setMasteryEffect(effect: MasteryEffect) {
  mastery_effect.current = effect;
  try {
    localStorage.setItem(storage_key, effect);
  } catch {}
}

export function restoreMasteryEffect() {
  try {
    const saved = localStorage.getItem(storage_key);
    if (saved && saved in mastery_effects)
      mastery_effect.current = saved as MasteryEffect;
  } catch {}
}
