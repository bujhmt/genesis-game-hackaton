import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {AbstractAction, MoveBack, MoveForward, TurnLeft, TurnRight} from "../../../state/tanks.actions";
import {Store} from "@ngxs/store";
import {Tank} from "@game/models";


enum Action {
  Forward = 'f',
  Backward = 'b',
  Left = 'l',
  Right = 'r',
}

@Component({
  selector: 'game-editor',
  templateUrl: './editor.component.html',
  styleUrls: [
    './editor.component.scss'
  ]
})
export class EditorComponentComponent implements  OnChanges, OnDestroy {
  @Input()
  clientId: string


  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = `forward();`;
  tickTime = 1000;
  tickInterval: NodeJS.Timeout;

  private actionsSet = new Set<Action>()

  private actionsMap: Record<Action, AbstractAction>;

  constructor(
    private readonly store: Store,
  ) {

  }

  ngOnDestroy(): void {
    clearInterval(this.tickInterval);
  }

  private run() {
    const forward = () => {
      this.actionsSet.add(Action.Forward)
    };
    const backward = () => {
      this.actionsSet.add(Action.Backward)
    };
    const left = () => {
      this.actionsSet.add(Action.Left)
    };
    const right = () => {
      this.actionsSet.add(Action.Right)
    };
    // const shoot = () => {
    //   this.actionsSet.add(Action.Shoot)
    // }
    eval(this.code)
    for (const actionCode of this.actionsSet.values()) {
      const action = this.actionsMap[actionCode];
      this.store.dispatch(action);
    }
    this.actionsSet.clear();
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.run()
    }
  }


  onCodeChange(value: string) {
    this.code = value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['clientId'].currentValue) {
      this.actionsMap = {
        [Action.Forward]: new MoveForward(this.clientId),
        [Action.Backward]: new MoveBack(this.clientId),
        [Action.Left]: new TurnLeft(this.clientId),
        [Action.Right]: new TurnRight(this.clientId),
      }
      this.tickInterval = setInterval(() => {
          this.run();
        },
        this.tickTime)
    }
  }


}
