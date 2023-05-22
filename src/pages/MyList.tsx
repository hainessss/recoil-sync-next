import { useRecoilValue, atom } from "recoil"
import { RecoilSync, syncEffect } from "recoil-sync";
import { array, string } from '@recoiljs/refine';
import { Suspense } from "react";

export const myListState = atom<readonly string[]>({
  key: 'myList',
  effects: [
    syncEffect({
      itemKey: 'myList',
      storeKey: 'my-db',
      refine: array(string())
    })
  ]
});

export const MyList = () => {
  const myList = useRecoilValue(myListState);
  return (
    <Suspense fallback={'loading'}>
      <RecoilSync
        storeKey="my-db"
        read={async () => ['item one', 'item two']}
      > 
        <p>My List:</p>
        {
          myList.map((listItem) => <p key='listItem'>{listItem}</p>)
        }
        </RecoilSync>
    </Suspense>
  )
}